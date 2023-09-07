import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate()
    const navbar = useRef()

    return (
        <header className="navbar">
            <span className="navbar__title">Codessey</span>
            <nav>
                
            </nav>
        </header>
    )
}