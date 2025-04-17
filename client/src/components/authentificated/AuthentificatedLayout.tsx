interface AuthentificatedLayoutProps {
  children: React.ReactNode;
}

const AuthentificatedLayout = ({ children }: AuthentificatedLayoutProps) => {
  return (
    <div className="app">
      <main className="main-content">{children}</main>
    </div>
  );
};
export default AuthentificatedLayout;
