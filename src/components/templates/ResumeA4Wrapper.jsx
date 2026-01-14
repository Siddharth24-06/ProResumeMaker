import { forwardRef } from 'react';

const ResumeA4Wrapper = forwardRef(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[210mm] min-h-[297mm] bg-white shadow-lg print:shadow-none p-[15mm] mx-auto"
    >
      {children}
    </div>
  );
});

ResumeA4Wrapper.displayName = 'ResumeA4Wrapper';

export default ResumeA4Wrapper;
