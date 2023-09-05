"use client"

import React, { useState, useEffect } from 'react'
import { Checkbox } from "@/app/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import Link from "next/link"

const InitialTODOs = [
	{
		checked: false,
		text: "Eat",
	},
	{
		checked: false,
		text: "Sleep",
	},
	{
		checked: true,
		text: "Code",
	}
]

const Cross2Icon = () => {
	return (<svg width="12" height="12" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>)
}

export default function Todo() {
	const [todo, setTODO] = useState(InitialTODOs);
	
	useEffect(() => {
		// load localStorage on page refresh
		const TODOs = JSON.parse(localStorage.getItem('TODOs'));
		  if (TODOs) {
			setTODO([...TODOs]);
		  }	
	  }, []);
	
	const setTODOPersistent = (todo) => {
		setTODO(todo);
		storeLocally();
	}
	
	const storeLocally = () => {
		localStorage.setItem('TODOs', JSON.stringify(todo));
	}
	
	const toggleState = (event, indexToToggle) => {
		event.preventDefault(); // prevent auto checked-state changing of the checkbox
		
		var update = [...todo];
		update[indexToToggle].checked = !update[indexToToggle].checked;
		setTODOPersistent(update);
	}
	
	const removeTODO = (event, index) => {
		// just to be sure: prevent default handling
		event.preventDefault();
		
		// remove item at 'index' position
		var update = [...todo];
		update.splice(index, 1);
		setTODOPersistent(update);
	}
	
	const addTODO = (event) => {
		if(event.key === 'Enter') {
			// just to be sure: prevent default handling
			event.preventDefault();
			
			// retrieve the text areas content value
			const text = event.target.value;
			if(text === '') return;
						
			// update state
			var update = [...todo];
			update.push({checked: false, created: 0, text: text});
			setTODOPersistent(update);
			
			// clear the text area
			event.target.value = '';		
		}
	}
	
	return (
		<Card>
		<CardHeader>
		  <CardTitle>TODO list with Next.js/shadcn</CardTitle>
		  <CardDescription>Use <kbd>Enter</kbd> key to submit new TODOs</CardDescription>
		</CardHeader>
		<CardContent>    
		<div className="items-top flex flex-col space-y-2">
		{
			todo.map((todo, index) => (
				<div className="items-top flex space-x-2" key={index}>
					<Checkbox id={`checkbox-${index}`} onClick={event=>toggleState(event, index)} checked={todo.checked}/>
						<div className="grid grid-cols-2 gap-1.5 leading-none">
							<div>
							<label
							  htmlFor={`checkbox-${index}`}
							  onClick={event=>toggleState(event, index)}
							  style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}
							  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{todo.text}			
							</label>
							</div>
							<div class="flex flex-col justify-end items-start">
								<Link onClick={event=>removeTODO(event, index)} href="#"><Cross2Icon/></Link>
							</div>
						</div>
				</div>
			))
		}	  
		</div>
		</CardContent>
		<CardFooter>
		  <input type="text" placeholder="Add new TODO item..." onKeyDown={event=>addTODO(event)}  style={{width: "100%"}}></input>
		</CardFooter>
	  </Card>
	)
}