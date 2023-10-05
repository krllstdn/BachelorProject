import React, { useEffect } from "react";

type BlurredBackdropProps = {
  children: React.ReactNode;
};

function BlurredBackdrop(props: BlurredBackdropProps) {
  useEffect(() => {
    // blocking scrolling when a modal is open
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center 
                items-center bg-opacity-10 bg-black backdrop-blur-sm 
                w-screen h-screen inset-0"
    >
      {props.children}
    </div>
  );
}

export default BlurredBackdrop;
