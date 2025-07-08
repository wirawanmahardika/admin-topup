import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function useAuth() {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login")
    }, [location])
}