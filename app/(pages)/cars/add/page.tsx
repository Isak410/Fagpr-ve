'use client';

export default function AddCarPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form
                action="/api/cars"
                method="POST"
                className="bg-white p-8 rounded-xl shadow w-full max-w-md"
            >
                <h1 className="text-xl font-semibold mb-6">Add Car</h1>

                <input
                    name="brand"
                    placeholder="Brand"
                    className="w-full mb-4 p-3 border rounded-lg"
                    required
                />

                <input
                    name="modelName"
                    placeholder="Model"
                    className="w-full mb-4 p-3 border rounded-lg"
                    required
                />

                <input
                    name="plateNo"
                    placeholder="Plate Number"
                    className="w-full mb-4 p-3 border rounded-lg"
                    required
                />

                <input
                    name="imageUrl"
                    placeholder="Image URL (optional)"
                    className="w-full mb-6 p-3 border rounded-lg"
                />

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg">
                    Add Car
                </button>
            </form>
        </div>
    );
}
