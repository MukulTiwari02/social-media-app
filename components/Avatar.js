const Avatar = ({size="sm"}) => {
  const classNameSmall = "rounded-full overflow-hidden ";
  const width =(size==='lg') ? "w-24 md:w-36" : "w-12";
  return (
    <div className={classNameSmall+width}>
      <img
        className="aspect-square"
        src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
  );
};

export default Avatar;
