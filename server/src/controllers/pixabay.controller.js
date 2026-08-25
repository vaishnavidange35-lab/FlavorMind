import { getDishImage } from '../services/pixabay.service.js';

export const getPixabayImage = async (req, res) => {
    try {
        const { dish } = req.query;
        
        if (!dish) {
            return res.status(400).json({
                success: false,
                message: 'Dish name query parameter is required'
            });
        }

        const imageUrl = await getDishImage(dish);

        return res.status(200).json({
            success: true,
            imageUrl
        });
    } catch (error) {
        console.error('Controller error in getPixabayImage:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching image',
            imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80'
        });
    }
};
