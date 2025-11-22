const ContinueWithDivider = () => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-primary text-white/60">or continue with</span>
      </div>
    </div>
  );
};

export default ContinueWithDivider;
