let token = '259d4d3543d63317b343958a2123a6ce944d22cd1fda12d4';

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://drone-guys.herokuapp.com/api/drones`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        } 
        return await response.json()
    },
    create: async(data: any = {}) => {
        const response = await fetch(`https://drone-guys.herokuapp.com/api/drones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to Create new Data on Server')
        }
        return await response.json()
    },
    update: async ( id:string, data:any = {} ) => {
        const response = await fetch(`https://drone-guys.herokuapp.com/api/drones/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async ( id:string ) => {
        const response = await fetch(`https://drone-guys.herokuapp.com/api/drones/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
    }
}