import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseMake,
    chooseModel,
    chooseYear,
    choosePrice,
    chooseColor} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CarFormProps{
    id?:string;
    data?:{};
}

interface CarState{
    make:string,
    model:string;
    year:string;
    color:string;
    price:string;
}

export const CarForm = (props:CarFormProps) => {
    const dispatch = useDispatch();
    let {carData, getData } = useGetData();
    const store = useStore();

    const make = useSelector<CarState>(state => state.make)
    const model = useSelector<CarState>(state => state.model)
    const year = useSelector<CarState>(state => state.year)
    const color = useSelector<CarState>(state => state.color)
    const price = useSelector<CarState>(state => state.price)

    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)
        if( props.id!){
            serverCalls.update(props.id!, data)
            console.log(`Updated: ${data.name} \nID: ${props.id}`)
            window.location.reload();
            event.target.reset()
        } else {
            dispatch(chooseMake(data.make))
            dispatch(chooseModel(data.model))
            dispatch(chooseYear(data.year))
            dispatch(chooseColor(data.color))
            dispatch(choosePrice(data.price))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload();
            event.target.rest();
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Make</label>
                    <Input {...register('make')} name='make' placeholder = 'Nissan'/>
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name="model" placeholder="Cube"/>
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name="year" placeholder="2022"/>
                </div>
                <div>
                    <label htmlFor="color">Color</label>
                    <Input {...register('color')} name="color" placeholder="Red"/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="18000"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}