"use client"; // Include this if you are using Next.js App Router, as HeroUI's interactive table requires client-side execution

import React from 'react';
// Updated library imports for HeroUI
import { Table, Chip, Tooltip, Button } from '@heroui/react'; 
import { LuFileDiff,  } from 'react-icons/lu'; 
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { TrashBin } from '@gravity-ui/icons';

const JobTable = ({ events = [] }) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'danger';
            default:
                return 'warning';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Manage All Jobs</h2>
                <p className="text-sm text-default-500">View, update, and manage your current job postings.</p>
            </div>

            <Table aria-label="Company jobs management table">
                <Table.ResizableContainer>
                    <Table.Content className="min-w-[800px]">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="1fr" id="jobTitle" minWidth={150} className={"text-xl"}>
                                 Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="typeCategory" minWidth={100} className={"text-xl"}>
                                 Category
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="location" minWidth={100} className={"text-xl"}>
                                Location
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={100} className={"text-xl"}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="ticketPrice" minWidth={100} className={"text-xl"}>
                                Price
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="seats" minWidth={100} className={"text-xl"}>
                                Seats
                                 <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="actions" minWidth={150} className={"text-xl"}>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No jobs found for this company."}>
                            {events.map((event) => (
                                <Table.Row key={event._id}>
                                    {/*  Title */}
                                    <Table.Cell>
                                        <div className="font-medium text-md text-default-800">
                                            {event.title}
                                        </div>
                                    </Table.Cell>

                                    {/* Type / Category */}
                                    <Table.Cell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-md capitalize font-medium">{event.category}</span>
       
                                        </div>
                                    </Table.Cell>

                                    {/* Location */}
                                    <Table.Cell>
                                        <span className="text-md  text-default-600">
                                            {event.location}
                                        </span>
                                    </Table.Cell>

                                    {/* Status */}
                                    <Table.Cell>
                                        <Chip 
                                            color={getStatusColor(event.status)} 
                                            size="sm" 
                                            variant="soft"
                                            className="capitalize"
                                        >
                                            {event.status || "pending"}
                                        </Chip>
                                    </Table.Cell>
                                    
                                     <Table.Cell>
                                        <span className="text-md  text-default-600">
                                           ${event.ticketPrice}
                                        </span>
                                    </Table.Cell>
                                     
                                     <Table.Cell>
                                        <span className="text-md  text-default-600">
                                            {event.seats}
                                        </span>
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <div className="relative flex items-center gap-2">
                                            <Tooltip content="Video Details">
                                                  <Button isIconOnly variant="secondary">
                                                    <FaEdit />
                                                   </Button>
                                            </Tooltip>
                                            <Tooltip content="Edit Job">
                            <Button isIconOnly variant="danger">
                                            <TrashBin />
                                               </Button>
                                            </Tooltip>
                                            
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default JobTable;