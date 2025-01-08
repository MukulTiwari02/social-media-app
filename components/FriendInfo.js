import Avatar from "./Avatar";

const FriendInfo = () => {
  return (
    <div className="flex gap-2">
      <Avatar />
      <div>
        <h1 className="font-bold text-xl">John Doe</h1>
        <p className="text-sm leading-4">5 mutual friends</p>
      </div>
    </div>
  );
};

export default FriendInfo;
