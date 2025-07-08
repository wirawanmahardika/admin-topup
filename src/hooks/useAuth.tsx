import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login")
    }, [location])
}