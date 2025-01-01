const Spinner = ({ size = 10, borderSize = 2, color = "black" }) => {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-300 via-indigo-500 to-purple-700">
        <div
          className={`animate-spin rounded-full`}
          style={{
            width: `${size}rem`,
            height: `${size}rem`,
            borderWidth: `${borderSize}rem`,
            borderTopColor: color,
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            boxShadow: `0 0 ${size / 2}rem rgba(0, 0, 0, 0.1)`,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1), rgba(0,0,0,0.1))",
          }}
        ></div>
      </div>
    );
  };
  
  export default Spinner;
  