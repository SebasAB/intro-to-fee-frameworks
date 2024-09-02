
import PropTypes from 'prop-types';

function Layout({ children }) {
    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-300 via-teal-400 to-blue-500">
            {children}
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
