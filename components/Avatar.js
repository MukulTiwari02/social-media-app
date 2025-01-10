const Avatar = ({size="sm", url}) => {
  const classNameSmall = "rounded-full overflow-hidden ";
  const width =(size==='lg') ? "w-24 md:w-36" : "w-12";
  return (
    <div className={classNameSmall+width}>
      <img
        className="aspect-square"
        src={url}
        alt=""
      />
    </div>
  );
};

export default Avatar;
