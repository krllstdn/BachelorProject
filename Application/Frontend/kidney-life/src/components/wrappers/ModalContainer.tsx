type ModalContainerProps = {
  children: React.ReactNode;
  /**
   * Use for the following tailwind classes: w-* p-* pt-* pb-* pl-* pr-*
   */
  className?: string;
};

function ModalContainer(props: ModalContainerProps) {
  return (
    <div
      className={
        "relative bg-secondary rounded-md border-2 border-primary " +
        props.className
      }
    >
      {props.children}
    </div>
  );
}

export default ModalContainer;
