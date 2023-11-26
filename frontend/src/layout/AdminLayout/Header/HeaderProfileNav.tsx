import { Dropdown, Nav, NavItem,
} from 'react-bootstrap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropsWithChildren } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faPowerOff} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@hooks/auth'
import axios from '@lib/axios'
import { useRouter } from "next/router";

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  )
}


export default function HeaderProfileNav() {

  const router = useRouter()
   const logout = async () => {
     try {
       const apiToken = localStorage.getItem("api_token");
       if (apiToken) {
         await axios.post("/api/logout");
         localStorage.removeItem("api_token");
       }
       router.push("/login")
     } catch (error) {
       console.error("Error during logout:", error);
     }
   };
  return (
    <Nav>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle variant="link" bsPrefix="hide-caret" className="py-0 px-2 rounded-0" id="dropdown-profile">
          <div className="avatar position-relative">
            <Image
              fill
              className="rounded-circle"
              src="/assets/img/logo_kelurahan.png"
              alt="user@email.com"
            />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="pt-0">
          <Dropdown.Header className="bg-light fw-bold rounded-top">Account</Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>
            <ItemWithIcon icon={faPowerOff}>Logout</ItemWithIcon>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  )
}
