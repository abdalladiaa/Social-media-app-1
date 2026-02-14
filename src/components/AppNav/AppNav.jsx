import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export function AppNav() {
  const { token, setToken , userData } = useContext(AuthContext);
  const {name , email} = userData || {}
  
  const navigate = useNavigate();

  function signout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <Navbar fluid rounded className="bg-white">
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Social Media
        </span>
      </NavbarBrand>
      {token && (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={userData?.name}
                img={userData?.photo}
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{name
                }</span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </DropdownHeader>
            <DropdownDivider />
            <DropdownItem onClick={signout}>Sign out</DropdownItem>
          </Dropdown>

          <NavbarToggle />
        </div>
      )}

      <NavbarCollapse>
        {token && (
          <>
            <NavLink to="/" end className="nav-link">
              Posts
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}

export default AppNav;
