import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { Button, Container } from 'react-bootstrap'
import Breadcrumb from '@layout/AdminLayout/Breadcrumb/Breadcrumb'
import HeaderProfileNav from '@layout/AdminLayout/Header/HeaderProfileNav'

type HeaderProps = {
  toggleSidebar: () => void;
  toggleSidebarMd: () => void;
}

export default function Header(props: HeaderProps) {
  const { toggleSidebar, toggleSidebarMd } = props

  return (
    <header className="header sticky-top z-10 mb-4 py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center justify-between">
        <Button
          variant="link"
          className="header-toggler d-md-none px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Button
          variant="link"
          className="header-toggler d-none d-md-inline-block px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebarMd}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div className="header-nav d-md-flex">
          <HeaderProfileNav />
        </div>
      </Container>
      <div className="header-divider border-top my-2 mx-sm-n2" />
      <Container fluid>
        <Breadcrumb />
      </Container>
    </header>
  )
}
