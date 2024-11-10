import s from "./header.module.sass";
const Header = () => {
  return (
    <div className={s.header}>
      <h1 className={s.header__title}>Todo List</h1>
      <nav className={s.header__navigation}>
        <ul className={s.header__navigation__links}>
          <li>All</li>
          <li>Home</li>
          <li>Work</li>
          <li>One day</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
