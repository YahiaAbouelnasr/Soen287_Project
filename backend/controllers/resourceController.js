import { Request, Response } from 'express';

import { createResource } from '../models/resource';
// hard coded mock data used for demo purposes
import { mockResources } from '../mock_data/resources_mock'; 


// ~~~~~~~~~~~ IMPORTS ABOVE, FUNCTIONS BELOW ~~~~~~~~~~~ 

// FIXME: by ID if I have extra time
export function findResourceByName(req, res){
    const resourceName = req.params.name;

    const resource = demoResources.find(
        r => r.name.toLowerCase() === name.toLowerCase();
    )

}

