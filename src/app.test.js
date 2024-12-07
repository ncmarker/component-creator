import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import TrashButton from './components/TrashButton';
import Searchbar from './components/Searchbar';
import { DropdownInput } from './components/DropdownInput';
import { TextInput } from './components/TextInput';
import LiveComponentRender from './components/LiveComponentRender';


// tests if search bar updates based on user input
test('Search bar updates on user input', () => {
    const mockSetSearchTerm = jest.fn();
    render(<Searchbar value="initial" onChange={mockSetSearchTerm} />);
  
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'new value' } });
  
    expect(mockSetSearchTerm).toHaveBeenCalledWith('new value');
});


// tests if custom text input updates based on user input
test("TextInput updates value on user input", () => {
    const mockOnChange = jest.fn();
    
    render(
      <TextInput
        label="Test Input"
        value=""
        onChange={mockOnChange}
        placeholder="Type here..."
        name="testInput"
      />
    );
    
    // change value
    const input = screen.getByPlaceholderText("Type here...");
    fireEvent.change(input, { target: { value: "Hello" } });

    // Verify mockOnChange was called when value changes
    expect(mockOnChange).toHaveBeenCalled();
});


// tests if custom dropdown updates based on user input
test("DropdownInput updates value on user selection", () => {
    const mockOnChange = jest.fn();
    const options = ["Option 1", "Option 2", "Option 3"];
    
    render(
      <DropdownInput
        label="Test Dropdown"
        options={options}
        value=""
        onChange={mockOnChange}
        name="testDropdown"
      />
    );
    
    // change value
    const select = screen.getByLabelText("Test Dropdown");
    fireEvent.change(select, { target: { value: "Option 2" } });
    
    // Verify mockOnChange was called when value changes
    expect(mockOnChange).toHaveBeenCalled();
});


// tests if custom input displays error when empty
test("Error message displays when TextInput is empty", () => {
    render(
      <TextInput
        label="Test Input"
        value=""
        onChange={() => {}}
        placeholder="Type here..."
        name="testInput"
        error="This field is required"
      />
    );
    // makes sure error message appears when value empty (if value not empty, fails)
    const errorMsg = screen.getByText("This field is required");
    expect(errorMsg.innerHTML).toBe("This field is required");
});


// tests if custom dropdown displays error when empty
test("Error message displays when no value is selected in Dropdown", () => {
    const options = ["Option 1", "Option 2"];
    
    render(
      <DropdownInput
        label="Test Dropdown"
        options={options}
        value=""
        onChange={() => {}}
        name="testDropdown"
        error="Please select an option"
      />
    );
    // makes sure error message appears when value empty (if value not empty, fails)
    const errorMsg = screen.getByText("Please select an option");
    expect(errorMsg.innerHTML).toBe("Please select an option");
});


// tests if delete button correctly calls delete function after fetch
test("Delete button calls delete function", async () => {
    const mockDelete = jest.fn();
    render(<TrashButton componentId={0} onDelete={mockDelete} />);
    
    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);
    
    // delete function called in promise (async)
    await waitFor(() => {
        expect(mockDelete).toHaveBeenCalledWith(0);
    });
});


// tests if my live renderer accurately creates a button based on form input
test('renders a button with the correct attributes', () => {
    const attributes = {
        type: 'button',
        name: 'submitButton',
        text: 'Submit',
        text_color: 'white',
        border_radius: 8,
        bg_color: 'blue',
        text_size: 16,
        size: 'medium',
    };

    render(<LiveComponentRender attributes={attributes} />);

    const button = screen.getByText('Submit');

    // Check if the button has the correct styles
    expect(button.style.backgroundColor).toBe('blue');
    expect(button.style.color).toBe('white');
    expect(button.style.borderRadius).toBe('8px');
    expect(button.style.fontSize).toBe('16px');
    expect(button.style.padding).toBe('8px 16px');
});


// tests if my live will fill in defualt value if not provided
test('renders a button with default text if text is not provided', () => {
    const attributes = {
        type: 'button',
        name: 'submitButton',
        text_color: 'white',
        border_radius: 8,
        bg_color: 'blue',
        text_size: 16,
        size: 'medium',
    };

    render(<LiveComponentRender attributes={attributes} />);

    // Check if the button renders with default text 'Button'
    const button = screen.getByText('Button');
    expect(button.innerHTML).toBe('Button');
});


// tests if my live renderer accurately creates an image based on form input
test('renders an image with the correct attributes', () => {
    const attributes = {
        name: 'profilePic',
        type: 'image',
        alt: 'profile', 
        border_color: 'black', 
        border_radius: 12, 
        size: 'small',
    };

    render(<LiveComponentRender attributes={attributes} />);

    const image = screen.getByAltText('profile');

    // Check if the image has the correct styles
    expect(image.style.borderColor).toBe('black');
    expect(image.style.borderRadius).toBe('12px');
    expect(image.style.height).toBe('64px');
    expect(image.style.width).toBe('64px');
});


// tests if my live renderer accurately creates an input based on form input
test('renders an input with the correct attributes', () => {
    const attributes = {
        name: 'myInput',
        type: 'input',
        placeholder: 'name', 
        text_color: 'black', 
        border_color: 'blue', 
        bg_color: 'white', 
        size: 'small',
        border_radius: 12, 
    };

    render(<LiveComponentRender attributes={attributes} />);

    const input = screen.getByPlaceholderText('name');

    // Check if the image has the correct styles
    expect(input.style.color).toBe('black');
    expect(input.style.borderColor).toBe('blue');
    expect(input.style.backgroundColor).toBe('white');
    expect(input.style.borderRadius).toBe('12px');
    expect(input.style.fontSize).toBe('14px');
    expect(input.style.height).toBe('32px');
    expect(input.style.width).toBe('96px');
});
