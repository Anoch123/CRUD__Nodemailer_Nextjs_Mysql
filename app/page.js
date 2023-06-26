"use client"
import { useForm, Controller } from "react-hook-form"
import axios from "axios";
import { useEffect, useState, useRef  } from "react";
import DataTable from 'react-data-table-component';
import { ipAddressHelper } from "./ipAddressHelper";
import Multiselect from 'multiselect-react-dropdown';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { TagsInput } from "react-tag-input-component";

let ip = ipAddressHelper();
const parser = new DOMParser();

const Home = () => {
	const { register, setValue, getValues , control ,handleSubmit, formState: { errors }, } = useForm({defaultValues:{gender: 'male'}});
	const [dataTable, setData] = useState([]);
	const form = useRef();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	});

	useEffect(() => {
		fetchData();
	}, []);
	
	let jobs = [
		{value: "", label: "Select Job"},
		{value: "Software Engineer", label: "Software Engineer"},
		{value: "Carpenter", label: "Carpenter"},
		{value: "Network Engineer", label: "Network Engineer"},
		{value: "CraftsMan", label: "CraftsMan"},
		{value: "Data Scientist", label: "Data Scientist"}
	];

	const falvors = ['chocolate','strawberry','vanilla']

	const fetchData = async () => {
		axios.get(ip+'getFromTbla')
			.then(function (response) {
				if (response.status == 200) {
					setData(response.data.data);
				}
			})
			.catch(function (error) {
				alert('Error fetching data:', error);
			})
	}

	const onSubmit = async (d) => {
		try {
			axios.post(ip+'insertToTbl',
				JSON.stringify(d)
			)
				.then(function (response) {
					if (response.status == 200) {
						alert(response.data.message);
						window.location.reload();
					} else {
						alert(response.data.message);
					}
				})
				.catch(function (error) {
					alert(error);
				});
		} catch (error) {
			alert('Error inserting data:', error);
		}
	}

	const columns = [
		{ name: 'ID', selector: row => row.id, sortable: true },
		{ name: 'Name', selector: row => row.name, sortable: true },
		{ name: 'Email', selector: row => row.email, sortable: true },
		{ name: 'Age', selector: row => row.age, sortable: true },
		{ name: 'DOB', selector: row => row.dob, sortable: true },
		{ name: 'Education', selector: row => row.education, sortable: true },
		{ name: 'Address', selector: row => row.address, sortable: true },
		{ name: 'City', selector: row => row.city, sortable: true },
		{ name: 'ZIP', selector: row => row.zip, sortable: true },
		{ name: 'JOB', selector: row => row.job, sortable: true },
		{ name: 'Note', selector: row => row.note, sortable: true },
		{ name: 'Gender', selector: row => row.gender, sortable: true },
		{ name: 'Citizen', selector: row => row.citizen, sortable: true },
		{ name: 'content', selector: row => row.content, sortable: true },
		{
			name: 'Actions',
			cell: (row) => (
			  <div className="flex">
					<button className="flex items-center mr-2" onClick={() => handleEdit(row.id)}>
						<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
						</svg>
					</button>
					<button className="flex items-center" onClick={() => handleDelete(row.id)}>
						<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
						</svg>
					</button>
			  </div>
			),
		},
	];

	const handleEdit = (ID) => {
		try {
			axios.post(ip+'getDataAboutClients',
				JSON.stringify(ID)
			)
				.then(function (response) {
					if (response.status == 200) {

						let id = response.data.data["ID"];
						let fullName = response.data.data['fullname'];
						let qemail = response.data.data['emial'];
						let qage = response.data.data['age'];
						let qdob = response.data.data['dob'];
						let qeducation = response.data.data['education'];
						let qaddress = response.data.data['address'];
						let qcity = response.data.data['city'];
						let qzipCode = response.data.data['zipCode'];
						let qjob = response.data.data['job'];
						let qnote = response.data.data['note'];
						let qgender = response.data.data['gender'];
						let qcitizen = response.data.data['srilankan'];
						let qdescription = response.data.data['desciption'];

						setValue('id', id)
						setValue('fullName', fullName)
						setValue('emailAddress', qemail)
						setValue('age', qage)
						setValue('DOB', qdob)
						setValue('education', qeducation)
						setValue('address', qaddress)
						setValue('cityName', qcity)
						setValue('zipCode', qzipCode)
						setValue('job', qjob)
						setValue('note', qnote)
						setValue('gender', qgender)
						setValue('citizen', qcitizen)
						setValue('content', qdescription)

					}
				})
				.catch(function (error) {
					alert(error);
				});
		} catch (error) {
			alert('Error handle edit data:', error);
		}
	}

	const handleDelete = (ID) => {
		try {
			axios.post(ip+'deleteClients',
				JSON.stringify(ID)
			)
				.then(function (response) {
					console.log(response)
					if (response.status == 200) {
						alert(response.data.message);
						window.location.reload();
					}
				})
				.catch(function (error) {
					alert(error);
				});
		} catch (error) {
			alert('Error deleting data:', error);
		}
	}
	
	const mappedData = dataTable.map((row, index) => ({
		id: row.ID,
		name: row.fullname,
		email: row.emial,
		age: row.age,
		dob: row.dob,
		education: row.education,
		address: row.address,
		city: row.city,
		zip: row.zipCode,
		job: row.job,
		note: row.note,
		gender: row.gender,
		citizen: row.srilankan,
		content: parser.parseFromString(row.desciption, 'text/html').body.textContent,
	}));


	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const sendEmail = (e) => {
		e.preventDefault();
		axios.post(ip+'send_email', formData)
		.then(response => {
			if (response.status == 200) {
				alert(response.data.message);
				window.location.reload();
			} else {
				alert(response.data.message);
			}
		})
		.catch(error => {
			console.error('Error sending email:', error);
		});
	};

	
	return (
		<main>
			<div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
				<div className="container max-w-screen-lg mx-auto">
					<div>
						<h2 className="font-semibold text-xl text-gray-600">xPower Human Resource Registration Form</h2>
						<p className="text-gray-500 mb-6">Please fill this entry form to get registered to xPower HRM System.</p>

						<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
									<div className="text-gray-600">
										<p className="font-medium text-lg">Personal Details</p>
										<p>Please fill out all the fields.</p>
									</div>

									<div className="lg:col-span-2">
										<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

										<div className="md:col-span-5">
												<label htmlFor="fullName">Full Name</label>
												<input {...register("id")} className="hidden h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
												<input {...register("fullName", { required: "Full Name is required!" })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Full Name" />
												{errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
											</div>

											<div className="md:col-span-5">
												<p>Email Address</p>
												<input {...register("emailAddress", { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address', }, })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
												{errors.emailAddress && <span className="text-red-500">{errors.emailAddress.message}</span>}
											</div>

											<div className="md:col-span-1">
												<p>Age</p>
												<input {...register("age", { required: 'Age is required' })} className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Age" />
												{errors.age && <span className="text-red-500">{errors.age.message}</span>}
											</div>

											<div className="md:col-span-2">
												<p>DOB</p>
												<input {...register("DOB", { required: 'Date of Birth is required', pattern: { value: /^(19|20)\d{2}-(0\d|1[0-2])-(0\d|1\d|2\d|3[01])$/, message: 'Invalid date format (YYYY-MM-DD)', }, })} className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="YYYY-MM-DD" />
												{errors.DOB && <span className="text-red-500">{errors.DOB.message}</span>}
											</div>

											<div className="md:col-span-2">
												<p>Education</p>
												<input {...register("education", { required: 'Your Education is required' })} className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Education" />
												{errors.education && <span className="text-red-500">{errors.education.message}</span>}
											</div>

											<div className="md:col-span-3">
												<p>Address / Street</p>
												<input {...register("address", { required: 'Address/Street is required' })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Address / Street" />
												{errors.address && <span className="text-red-500">{errors.address.message}</span>}
											</div>

											<div className="md:col-span-2">
												<p>City</p>
												<input {...register("cityName")} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="City" />
												{errors.cityName && <span className="text-red-500">{errors.cityName.message}</span>}
											</div>

											<div className="md:col-span-1">
												<p>Zipcode</p>
												<input {...register("zipCode", { required: 'ZIP is required' })} className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="ZIP Code" />
												{errors.zipCode && <span className="text-red-500">{errors.zipCode.message}</span>}
											</div>

											<div className="md:col-span-2">
												<p>JOB</p>
												<select {...register("job", { required: 'Job is required' })} className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50">
													{
														jobs.map((option) => (
															<option key={option.value} value={option.value}>{option.label}</option>
														))
													}
												</select>
												{errors.job && <span className="text-red-500">{errors.job.message}</span>}
											</div>

											<div className="md:col-span-5">
												<p>Note</p>
												<textarea
													className="transition-all flex items-center h-50 mt-1 px-4 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
													{...register("note", { required: 'Note is required' })}
												/>
												{errors.note && <span className="text-red-500">{errors.note.message}</span>}
											</div>

											<div className="md:col-span-5">
												<p>Gender</p>
												<label>
													<input
														type="radio"
														value="male"
														{...register('gender')}
													/>
													Male
												</label>
												
												<label>
													<input
														type="radio"
														value="female"
														{...register('gender')}
													/>
													Female
												</label>
											</div>

											<div className="md:col-span-5 flex">
												<input
													type="checkbox"
													id="checkboxOption"
													{...register('citizen')}
													defaultChecked={true}
													className="h-3 w-3 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
												/>
												<label htmlFor="checkboxOption" className="ml-2 text-gray-700">
													Are you a Sri Lankan?
												</label>
											</div>

											{/* <div className="md:col-span-5">
												<label>Flavours</label>
												<Controller
													control={control}
													name="flavours"
													render={({ field: { value, onChange } }) => (
														<Multiselect
															options={falvors}
															isObject={false}
															hidePlaceholder={true}
															closeOnSelect={false}
															onSelect={onChange}
															onRemove={onChange}
															selectedValues={value}
														/>
													)}
												/>
											</div> */}

											<div className="md:col-span-5">
												<p>Description</p>
												<Controller
													name="content"
													control={control}
													render={({ field }) => (
														<ReactQuill
															value={field.value}
															onChange={field.onChange}
															onBlur={field.onBlur}
															theme="snow"
														/>
													)}
												/>
											</div>

											{/* <div className="md:col-span-5">
												<p>Features</p>
												<Controller
													name="tags"
													control={control}
													render={({ field }) => (
														<TagsInput
															tags={field.value}
															onChange={field.onChange}
															onBlur={field.onBlur}
															placeholder="Add tags"
														/>
													)}
												/>
											</div> */}

											<div className="md:col-span-5 text-right">
												<div className="inline-flex items-end">
													<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
							<h2 className="font-semibold text-xl text-gray-600">xPower Human Resource All Users</h2>
							<p className="text-gray-500 mb-6">Update / Delete users from xPower HRM System.</p>

							<div className="flex flex-col">
								<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
									<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
										<div className="overflow-hidden">
											<table className="min-w-full text-center text-sm font-light">
												<thead className="border-b font-medium dark:border-neutral-500">
													<tr>
														<th scope="col" className="px-6 py-4">ID</th>
														<th scope="col" className="px-6 py-4">Full Name</th>
														<th scope="col" className="px-6 py-4">Email</th>
														<th scope="col" className="px-6 py-4">Age</th>
														<th scope="col" className="px-6 py-4">DOB</th>
														<th scope="col" className="px-6 py-4">Education</th>
														<th scope="col" className="px-6 py-4">Address</th>
														<th scope="col" className="px-6 py-4">City</th>
														<th scope="col" className="px-6 py-4">ZIP Code</th>
														<th scope="col" className="px-6 py-4">Job</th>
														<th scope="col" className="px-6 py-4">Note</th>
														<th scope="col" className="px-6 py-4">Gender</th>
														<th scope="col" className="px-6 py-4">Citizen</th>
														<th scope="col" className="px-6 py-4">Description</th>
														<th scope="col" className="px-6 py-4">Action</th>
													</tr>
												</thead>
												<tbody>
													{dataTable.map((row, index) => (
														<tr key={index}>
															<td className="whitespace-nowrap px-6 py-4">{row.ID}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.fullname}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.emial}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.age}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.dob}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.education}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.address}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.city}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.zipCode}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.job}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.note}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.gender}</td>
															<td className="whitespace-nowrap px-6 py-4">{row.srilankan}</td>
															<td className="whitespace-nowrap px-6 py-4">{parser.parseFromString(row.desciption, 'text/html').body.textContent}</td>
															<td className="whitespace-nowrap px-6 py-4 flex">
																<div className="flex">
																	<button className="flex items-center mr-2" onClick={() => handleEdit(row.ID)}>
																		<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																			<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
																		</svg>
																	</button>
																	<button className="flex items-center" onClick={() => handleDelete(row.ID)}>
																		<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																			<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
																		</svg>
																	</button>
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
							<h2 className="font-semibold text-xl text-gray-600">xPower Human Resource All Users Data Table</h2>
							<p className="text-gray-500 mb-6">Update / Delete users from xPower HRM System.</p>

							<div className="flex flex-col">
								<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
									<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
										<div className="overflow-hidden">
											<DataTable
												columns={columns}
												data={mappedData}
												pagination
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
							<h2 className="font-semibold text-xl text-gray-600">xPower Human Resource All Users Box Format</h2>
							<p className="text-gray-500 mb-6">Update / Delete users from xPower HRM System.</p>

							<div className="flex flex-col">
								<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
									<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
										<div className="overflow-hidden">
											<div className="flex space-x-4">
												{dataTable.map((row, index) => (
													<div className="w-72 h-100 bg-gray-300 rounded" key={index}>
														<ul className="p-5">
															<li className="mb-1">{row.fullname}</li>
															<li className="mb-1">{row.emial}</li>
															<li className="mb-1">{row.age}</li>
															<li className="mb-1">{row.dob}</li>
															<li className="mb-1">{row.education}</li>
															<li className="mb-1">{row.address}</li>
															<li className="mb-1">{row.city}</li>
															<li className="mb-1">{row.zipCode}</li>
															<li className="mb-1">{row.job}</li>
															<li className="mb-1">{row.note}</li>
															<li className="mb-1">{row.gender}</li>
															<li className="mb-1">{row.srilankan}</li>
															<li className="mb-1">{parser.parseFromString(row.desciption, 'text/html').body.textContent}</li>
															<li className="mb-1">
																<div className="flex">
																	<button className="flex items-center mr-2" onClick={() => handleEdit(row.ID)}>
																		<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																			<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
																		</svg>
																	</button>
																	<button className="flex items-center" onClick={() => handleDelete(row.ID)}>
																		<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																			<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
																		</svg>
																	</button>
																</div>
															</li>
														</ul>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
							<h2 className="font-semibold text-xl text-gray-600">xPower Human Resource Email Sending</h2>
							<p className="text-gray-500 mb-6">Send emails from xPower HRM System.</p>

							<form ref={form} onSubmit={sendEmail}>
								<div className="lg:col-span-2">
									<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

										<div className="md:col-span-2">
											<p>Full Name</p>
											<input name="name" onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
										</div>

										<div className="md:col-span-2">
											<p>Email Address</p>
											<input name="email" onChange={handleInputChange} className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
										</div>

										<div className="md:col-span-5">
											<p>Message</p>
											<textarea name="message" onChange={handleInputChange} className="transition-all flex items-center h-50 mt-1 px-4 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
										</div>

										<div className="md:col-span-5 text-right">
											<div className="inline-flex items-end">
												<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
