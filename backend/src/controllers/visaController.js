import prisma from '../config/database.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

export const getAllVisaPackages = asyncHandler(async (req, res, next) => {
    const { country, type } = req.query;

    const where = {};
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (type) where.type = { contains: type, mode: 'insensitive' };

    try {
        const packages = await prisma.visa_packages.findMany({
            where,
            orderBy: { isPopular: 'desc' }
        });

        // Always return an array, even if empty
        res.status(200).json({
            status: 'success',
            results: packages.length,
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
