import { NavLink, Outlet } from 'react-router-dom'

function MasterLayout() {
    return (
        <div>
            <nav style={{display: 'flex', justifyContent: 'end', gap: '10px'}}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer style={{'textAlign': "center"}}>{new Date().getFullYear().toString()} - Powered by ICT Center</footer>
        </div>
    )
}

export default MasterLayout