let token = '259d4d3543d63317b343958a2123a6ce944d22cd1fda12d4';

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://drone-guys.herokuapp.com/api/drones`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}