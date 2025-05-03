
const SectionTitle = ({ heading, subheading }) => {
    return (
      <div className="text-center mb-10 max-w-xl mx-auto">
        <p className="text-yellow-600 italic mb-2">---{subheading}---</p>
        <div className="border-t-2 border-gray-200 w-full my-2"></div>
        <h3 className="text-3xl font-bold uppercase">{heading}</h3>
        <div className="border-t-2 border-gray-200 w-full my-2"></div>
      </div>
    );
  };
  
  export default SectionTitle;
  