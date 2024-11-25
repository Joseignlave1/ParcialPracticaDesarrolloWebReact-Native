export const getPlanets = async () => {
    try {
        const response = await fetch("http://localhost:8000/planets");
        if (!response.ok) {
            throw new Error('Error fetching planets');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPlanetById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/planets/${id}`)
          if (!response.ok) {
            throw new Error('Error fetching planets');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
}


export const addPlanet = async (planetData) => {
    try {
        const response = await fetch("http://localhost:8000/planets",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(planetData)
        } );
         if (!response.ok) {
            throw new Error('Error fetching planets');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const deletePlanet = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/planets/${id}`, {
            method: 'DELETE'
        })

         if (!response.ok) {
            throw new Error('Error fetching planets');
        } 
        return await response.json();
    } catch (error) {
        throw error;   
    }
} 


export const updatePlanet = async (id, planetData) => {
    try {
        const response = await fetch(`http://localhost:8000/planets/${id}`, {
            method: 'PUT',
             headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(planetData)
            
        });
         if (!response.ok) {
            throw new Error('Error fetching planets');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
}
