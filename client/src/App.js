//imports

const App = () => {

    return(
    <>
    <Router>
    <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/favorites" element={<Fav />} />

        </Routes>
    </Router>
    </>
    )

};

export default App;