import prisma from '../config/database.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

// Simple in-memory cache (60 seconds TTL)
const cache = new Map();
const CACHE_TTL = 60 * 1000; // 60 seconds

const getCachedData = (key) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }
    return null;
};

const setCachedData = (key, data) => {
    cache.set(key, { data, timestamp: Date.now() });
    // Clean old entries periodically
    if (cache.size > 100) {
        const now = Date.now();
        for (const [k, v] of cache.entries()) {
            if (now - v.timestamp > CACHE_TTL) {
                cache.delete(k);
            }
        }
    }
};

export const getAllVisaPackages = asyncHandler(async (req, res, next) => {
    const { country, type } = req.query;
    
    // Create cache key
    const cacheKey = `visas:${country || 'all'}:${type || 'all'}`;
    
    // Check cache first
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
        return res.status(200).json({
            status: 'success',
            results: cachedResult.length,
            cached: true,
            data: {
                packages: cachedResult
            }
        });
    }

    const where = {};
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (type) where.type = { contains: type, mode: 'insensitive' };

    try {
        // Optimized query - select only needed fields
        const packages = await prisma.visa_packages.findMany({
            where,
            select: {
                id: true,
                country: true,
                slug: true,
                type: true,
                description: true,
                duration: true,
                processingTime: true,
                cost: true,
                validity: true,
                entryType: true,
                requirements: true,
                imageUrl: true,
                isPopular: true,
                createdAt: true,
            },
            orderBy: [
                { isPopular: 'desc' },
                { createdAt: 'desc' }
            ],
            take: 50 // Limit to 50 packages for performance
        });

        // Cache the result
        setCachedData(cacheKey, packages);

        // Always return an array, even if empty
        res.status(200).json({
            status: 'success',
            results: packages.length,
            cached: false,
            data: {
                packages: packages || []
            }
        });
    } catch (error) {
        console.error('Error fetching visa packages:', error);
        // Return empty array on database errors instead of crashing
        res.status(200).json({
            status: 'success',
            results: 0,
            error: 'Database temporarily unavailable',
            data: {
                packages: []
            }
        });
    }
});

export const getVisaPackageBySlug = asyncHandler(async (req, res, next) => {
    const { slug } = req.params;

    const visaPackage = await prisma.visa_packages.findUnique({
        where: { slug }
    });

    if (!visaPackage) {
        throw new ApiError(404, 'No visa package found with that slug');
    }

    res.status(200).json({
        status: 'success',
        data: {
            visaPackage
        }
    });
});
