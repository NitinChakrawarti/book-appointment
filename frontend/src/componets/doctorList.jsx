import { Link } from "react-router-dom";

const DoctorList = ({ doctor }) => {
    return (
        <div className="container p-6 shadow-md mt-8 bg-white rounded-lg">
            {/* Header */}
            <div className="text-center border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Dr. {doctor.firstName} {doctor.lastName}
                </h1>
            </div>

            {/* Doctor Details */}
            <div className="mt-6 space-y-4">
                <p className="text-lg text-gray-700">
                    <strong>Expertise:</strong> {doctor.specialization} expert
                </p>
                <p className="text-lg text-gray-700">
                    <strong>Experience:</strong> {doctor.experience}+ years
                </p>
                <p className="text-lg text-gray-700">
                    <strong>Site:</strong>
                    <Link 
                        to={doctor.website} 
                        target="_blank" 
                        className="text-blue-600 hover:underline ml-1"
                    >
                        {doctor.website}
                    </Link>
                </p>
                <p className="text-lg text-gray-700">
                    <strong>Timings:</strong> {doctor.timings[0]} to {doctor.timings[1]}
                </p>
            </div>

            {/* Fee and Booking */}
            <div className="mt-6 flex items-center space-x-4">
                <Link
                    to={`/user/appointment/${doctor._id}`}
                    className="bg-blue-600 text-white rounded-md px-4 py-2 text-lg font-semibold hover:bg-blue-700"
                >
                    Get Details
                </Link>
            </div>
        </div>
    );
};

export default DoctorList;
