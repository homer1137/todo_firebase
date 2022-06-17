import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App'

 //наличие элементов на странице

describe('Наличие элементов на странице', ()=>{
    const setup = () => render(<App/>);
    
    test('Заголовок Todos', ()=>{
        setup();
        const h1element = screen.getByText(/todos/i)
        expect(h1element).toBeInTheDocument();
    })
    test('Заголовок h2', ()=>{  
        setup();
        const h2element = screen.getByText(/What is need to be done/i)
        expect(h2element).toBeInTheDocument();
     })
     test('Заголовок inputCreateTodo', ()=>{  
        setup();
        const inputCreateTodo = screen.getByPlaceholderText(/Todo description/i)
        expect(inputCreateTodo).toBeInTheDocument();
     })
     test('Заголовок buttonCreateTodo', ()=>{  
        setup();
        const buttonCreateTodo = screen.getByText(/Create new todo/i)
        expect(buttonCreateTodo).toBeInTheDocument();
     })
     test('Заголовок buttonAll', ()=>{  
        setup();
        const buttonAll = screen.getByText(/All/i)
        expect(buttonAll).toBeInTheDocument();
     })
     test('Заголовок buttonActive', ()=>{  
        setup();
        const buttonActive = screen.getByText(/Active/i)
        expect(buttonActive).toBeInTheDocument();
     })
     test('Заголовок buttonCompleted', ()=>{  
        setup();
        const buttonCompleted = screen.getByText('Completed')
        expect(buttonCompleted).toBeInTheDocument();
     })
     test('Заголовок buttonClearCompleted', ()=>{ 
        setup(); 
        const buttonClearCompleted = screen.getByText(/Clear Completed/i)
        expect(buttonClearCompleted).toBeInTheDocument();
        expect(buttonClearCompleted).toMatchSnapshot()
     })
     test('Заголовок items left', ()=>{  
        setup();
        const itemsLeft = screen.getByText(/items left/i)
        expect(itemsLeft).toBeInTheDocument();
        expect(itemsLeft).toMatchSnapshot()
     })
    
})

//Создание дела

describe('create todo', ()=>{
    
    test('create todo', ()=>{
        render(<App/>);
        const inputCreateTodo = screen.getByPlaceholderText(/Todo description/i);
        expect(inputCreateTodo).toContainHTML('')
        fireEvent.input(inputCreateTodo, {target:{value: 'say hello'}})
        expect(inputCreateTodo).toContainHTML('say hello')
        const buttonCreateTodo = screen.getByText(/Create new todo/i)
        fireEvent.click(buttonCreateTodo);
        const newTodo = screen.getByText(/say hello/i)
        expect(newTodo).toBeInTheDocument();
    })
})


