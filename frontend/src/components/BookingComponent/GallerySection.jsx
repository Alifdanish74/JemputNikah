import React from 'react';
import { Button } from 'flowbite-react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';

function GallerySection({ onPrevious, onNext, formData, handleFormDataChange }) {
    // Array of objects { file, previewUrl }
    const images = formData.galleryImages || [];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (images.length >= 5) {
                alert("Anda hanya boleh memuat naik sehingga 5 gambar.");
                return;
            }
            const previewUrl = URL.createObjectURL(file);
            const newImages = [...images, { file, previewUrl }];
            handleFormDataChange("galleryImages", newImages);
        }
        // Reset the input value so the same file can be selected again if it was removed
        e.target.value = '';
    };

    const handleRemoveImage = (indexToRemove) => {
        // Find the image being removed to possibly revoke its object URL to prevent memory leaks (optional but good practice)
        const removedImage = images[indexToRemove];
        if (removedImage.previewUrl) {
            URL.revokeObjectURL(removedImage.previewUrl);
        }

        const newImages = images.filter((_, index) => index !== indexToRemove);
        handleFormDataChange("galleryImages", newImages);
    };

    return (
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Galeri Gambar</h2>
            <p className="text-sm text-gray-500 mb-6">Tambahkan gambar memori anda untuk dipamerkan pada kad digital. Anda boleh memuat naik sehingga 5 keping gambar.</p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {images.map((img, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200">
                        <img
                            src={img.previewUrl}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-32 md:h-40 object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-sm"
                            title="Padam gambar"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                ))}

                {images.length < 5 && (
                    <div className="relative h-32 md:h-40 w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50">
                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        <span className="text-sm text-gray-500 font-medium">Tambah Gambar</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2">
                <div className="flex space-x-3 justify-start">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="text-white bg-gray-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 sm:py-3.5 text-center"
                    >
                        <HiOutlineArrowNarrowLeft />
                    </button>
                </div>
                <div className="flex space-x-3 justify-end">
                    <button
                        type="button"
                        onClick={onNext}
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 sm:py-3.5 text-center"
                    >
                        <HiOutlineArrowNarrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GallerySection;