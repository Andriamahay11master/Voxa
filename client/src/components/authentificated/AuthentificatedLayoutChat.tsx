interface AuthentificatedLayoutChatProps {
  children: React.ReactNode;
}

const AuthentificatedLayoutChat = ({
  children,
}: AuthentificatedLayoutChatProps) => {
  return (
    <div className="app-chat">
      <main className="main-content">{children}</main>
    </div>
  );
};
export default AuthentificatedLayoutChat;
