import { Image as ImageIcon, Upload } from 'lucide-react';

interface EventMediaProps {
  data: {
    bannerImage: string;
    logo: string;
  };
  onUpdate: (data: any) => void;
}

export default function EventMedia({ data, onUpdate }: EventMediaProps) {
  const handleImageUpload = (type: 'bannerImage' | 'logo') => {
    // In a real application, this would handle file uploads
    // For now, we'll just use placeholder URLs
    const placeholderUrls = {
      bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      logo: 'https://images.unsplash.com/photo-1529074963764-98f42f7254b1',
    };

    onUpdate({ [type]: placeholderUrls[type] });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Banner Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          {data.bannerImage ? (
            <div className="space-y-2">
              <img
                src={data.bannerImage}
                alt="Event banner"
                className="max-h-48 rounded-lg"
              />
              <button
                type="button"
                onClick={() => onUpdate({ bannerImage: '' })}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => handleImageUpload('bannerImage')}
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  Upload a file
                </button>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Logo (Optional)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          {data.logo ? (
            <div className="space-y-2">
              <img
                src={data.logo}
                alt="Event logo"
                className="max-h-32 rounded-lg"
              />
              <button
                type="button"
                onClick={() => onUpdate({ logo: '' })}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Remove Logo
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => handleImageUpload('logo')}
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  Upload a logo
                </button>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}