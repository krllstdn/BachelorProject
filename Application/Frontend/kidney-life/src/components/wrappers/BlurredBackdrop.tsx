type BlurredBackdropProps = {
  children: React.ReactNode;
};

function BlurredBackdrop(props: BlurredBackdropProps) {
  return (
    <div
      className="absolute top-0 left-0 z-10 flex justify-center 
                        items-center bg-opacity-10 bg-black backdrop-blur-sm 
                        h-screen w-screen"
    >
      {props.children}
    </div>
  );
}

export default BlurredBackdrop;
