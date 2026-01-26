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

export const getAllTours = asyncHandler(async (req, res, next) => {
    const { category, country, minPrice, maxPrice, sortBy } = req.query;
    
    // Create cache key
    const cacheKey = `tours:${category || 'all'}:${country || 'all'}:${minPrice || '0'}:${maxPrice || 'max'}:${sortBy || 'popular'}`;
    
    // Check cache first
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
        return res.status(200).json({
            status: 'success',
            results: cachedResult.length,
            cached: true,
            data: {
                tours: cachedResult
            }
        });
    }

    // Build where clause
    const where = { isActive: true };
    if (category && category !== 'all') where.category = category;
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Build orderBy clause
    let orderBy = [{ isFeatured: 'desc' }];
    switch (sortBy) {
        case 'price-low':
            orderBy.push({ price: 'asc' });
            break;
        case 'price-high':
            orderBy.push({ price: 'desc' });
            break;
        case 'rating':
            orderBy.push({ rating: 'desc' });
            break;
        case 'duration':
            orderBy.push({ duration: 'asc' });
            break;
        default:
            orderBy.push({ totalReviews: 'desc' });
    }

    try {
        // Optimized query - select only needed fields
        const tours = await prisma.tours.findMany({
            where,
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                shortDescription: true,
                destination: true,
                country: true,
                category: true,
                duration: true,
                price: true,
                discountPrice: true,
                maxGroupSize: true,
                difficulty: true,
                inclusions: true,
                highlights: true,
                coverImage: true,
                images: true,
                rating: true,
                totalReviews: true,
                isFeatured: true,
                isHajjUmrah: true,
                createdAt: true,
            },
            orderBy,
            take: 50 // Limit to 50 tours for performance
        });

        // Cache the result
        setCachedData(cacheKey, tours);

        res.status(200).json({
            status: 'success',
            results: tours.length,
            cached: false,
            data: {
                tours: tours || []
            }
        });
    } catch (error) {
        console.error('Error fetching tours:', error);
        // Return empty array on database errors
        res.status(200).json({
            status: 'success',
            results: 0,
            error: 'Database temporarily unavailable',
            data: {
                tours: []
            }
        });
    }
});

export const getTourBySlug = asyncHandler(async (req, res, next) => {
    const { slug } = req.params;

    // Check cache first
    const cacheKey = `tour:${slug}`;
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
        return res.status(200).json({
            status: 'success',
            cached: true,
            data: {
                tour: cachedResult
            }
        });
    }

    const tour = await prisma.tours.findUnique({
        where: { slug },
        include: {
            reviews: {
                where: { isApproved: true },
                take: 10,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    rating: true,
                    title: true,
                    comment: true,
                    createdAt: true,
                    users: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profileImage: true,
                        }
                    }
                }
            }
        }
    });

    if (!tour) {
        throw new ApiError(404, 'No tour found with that slug');
    }

    // Cache the result
    setCachedData(cacheKey, tour);

    res.status(200).json({
        status: 'success',
        cached: false,
        data: {
            tour
        }
    });
});

export const getTourById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const tour = await prisma.tours.findUnique({
        where: { id },
        include: {
            reviews: {
                where: { isApproved: true },
                take: 10,
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!tour) {
        throw new ApiError(404, 'No tour found with that ID');
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

// Get featured tours
export const getFeaturedTours = asyncHandler(async (req, res, next) => {
    const cacheKey = 'tours:featured';
    
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
        return res.status(200).json({
            status: 'success',
            results: cachedResult.length,
            cached: true,
            data: {
                tours: cachedResult
            }
        });
    }

    const tours = await prisma.tours.findMany({
        where: {
            isActive: true,
            isFeatured: true
        },
        select: {
            id: true,
            title: true,
            slug: true,
            shortDescription: true,
            destination: true,
            duration: true,
            price: true,
            discountPrice: true,
            coverImage: true,
            rating: true,
            totalReviews: true,
            category: true,
        },
        orderBy: [
            { rating: 'desc' },
            { totalReviews: 'desc' }
        ],
        take: 6
    });

    setCachedData(cacheKey, tours);

    res.status(200).json({
        status: 'success',
        results: tours.length,
        cached: false,
        data: {
            tours
        }
    });
});
