import Navbar from "../navbar/Navbar";

interface AuthentificatedLayoutProps {
  children: React.ReactNode;
}

const AuthentificatedLayout = ({ children }: AuthentificatedLayoutProps) => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
};
export default AuthentificatedLayout;
