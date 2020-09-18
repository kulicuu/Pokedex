                <input 
                    disabled={filterTreeLoading}
                    type="text"
                    placeholder="Species"
                    onChange= {(e) => {
                        this.setState({
                            filteredSpecies: searchPrefixTree(e.target.value, this.props.filterTree)
                        })
                    }}
                />
                <ul>
                    {this.state.filteredSpecies.map((specie, idx) => {
                        return <li key={`filteredSpecies:${idx}`}> {specie} </li>
                    })}
                </ul>