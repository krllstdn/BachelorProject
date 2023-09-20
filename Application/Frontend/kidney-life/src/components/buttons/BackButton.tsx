type BackIconProps = {
  onClick: () => void;
};

function BackIcon(props: BackIconProps) {
  return (
    <button
      className="absolute top-0 left-0 text-primary pl-8 pt-6
                                    text-3xl"
      type="button"
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7"
      >
        <path
          fillRule="evenodd"
          d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default BackIcon;
