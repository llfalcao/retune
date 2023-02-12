interface Props {
  className?: string;
}

export const DarkMode = ({ className }: Props) => {
  return (
    <svg
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="DarkModeIcon"
      className={className}
    >
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path>
    </svg>
  );
};
