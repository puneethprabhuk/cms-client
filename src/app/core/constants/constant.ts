export const TYPE_OF_ASSIGNMENT = ['Audit', 'Tax Audit', 'Tax Filing'];
export const STATUS = ['Pending', 'Received'];

//Regex
export const CONTACT_NUMBER_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const NAME_REGEX = /^[a-z ,.'-]+$/i;
export const NUMBER_REGEX = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
export const PASSWORD_REGEX = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';



export const DELETE_TRANSACTION_TITLE = "Delete transaction";
export const LOGIN_TITLE = "Login";
export const SERVER_ERROR = "Server error";
export const ADD_TRANSACTION_TITLE = "Add transaction";
export const UPDATE_TRANSACTION_TITLE = "Update transaction";
export const LOGIN_SUCCESS = "Login successful";
export const LOGIN_FAILED = "Login failed";
export const DELETE_TRANSACTION_CONF_MESSAGE = "Are you sure you want to delete this transaction?";
export const DELETE_TRANSACTION_MESSAGE = "Are you sure you want to delete this transaction?";
export const ADD_TRANSACTION_MESSAGE = "Transaction added successfully";
export const UPDATE_TRANSACTION_MESSAGE = "Transaction updated successfully";
export const DELETE_CLIENT_TITLE = "Delete client";
export const ADD_CLIENT_TITLE = "Add client";
export const UPDATE_PROFILE_TITLE = "Update profile";
export const UPDATE_CLIENT_TITLE = "Update client";
export const DELETE_CLIENT_CONF_MESSAGE = "Are you sure you want to delete this client?";
export const DELETE_CLIENT_MESSAGE = "Client deleted successfully";
export const ADD_CLIENT_MESSAGE = "Client added successfully";
export const UPDATE_CLIENT_MESSAGE = "Client updated successfully";
export const UPDATE_PROFILE_MESSAGE = "Profile updated successfully";


export const SOMETHING_WENT_WRONG = "Oops!! Something went wrong";

export const CLOSE_TEXT = "Close";
export const DELETE_TEXT = "Delete";


export const CLIENT_TABLE_NAME = "name";
export const CLIENT_TABLE_EMAIL = "emailAddress";
export const CLIENT_TABLE_NUMBER = "contactNumber";
export const CLIENT_TABLE_ADDRESS = "address";
export const CLIENT_TABLE_CREATED_DATE = "createdDate";
export const CLIENT_TABLE_UPDATED_DATE = "updatedDate";
export const CLIENT_TABLE_ACTION = "action";


export const TRANSACTION_TABLE_NAME = "name";
export const TRANSACTION_TABLE_TYPE = "typeOfAssignment";
export const TRANSACTION_TABLE_FEES = "fees";
export const TRANSACTION_TABLE_FIN_YEAR = "financialYear";
export const TRANSACTION_TABLE_ASM_YEAR = "assessmentYear";
export const TRANSACTION_TABLE_CREATED_DATE = "createdDate";
export const TRANSACTION_TABLE_UPDATED_DATE = "updatedDate";
export const TRANSACTION_TABLE_STATUS = "status";
export const TRANSACTION_TABLE_ACTION = "action";
