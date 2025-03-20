import React from "react";

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerslot?: React.ReactNode;
  className?: string;
  bodyClass?: string;
  titleClass?: string;
  noborder?: boolean;
}
const Card = ({
  children,
  title,
  subtitle,
  headerslot,
  className = "custom-class  bg-white ",
  bodyClass = "",
  noborder,
  titleClass = "custom-class ",
}: CardProps) => {
  return (
    <div
      className={`
        card rounded-md   dark:bg-slate-800   
    ${className}
        `}
    >
      {(title || subtitle) && (
        <header className={`card-header ${noborder ? "no-border" : ""}`}>
          <div>
            {title && <div className={`card-title ${titleClass}`}>{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerslot && <div className="card-header-slot">{headerslot}</div>}
        </header>
      )}
      <main className={`card-body ${bodyClass}`}>{children}</main>
    </div>
  );
};

export default Card;
