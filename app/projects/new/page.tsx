"use client";
import React, { useState } from "react";
import { Button, Form, Input, DatePicker } from "antd";

type LayoutType = Parameters<typeof Form>[0]["layout"];

export default function NewProjectPage() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  return (
    <main>
      <header className="flex items-center justify-between mb-10">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl">
          New project
        </h1>
      </header>

      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
      >
        <Form.Item label="Project ID">
          <Input placeholder="Enter project ID" />
        </Form.Item>
        <Form.Item label="Project name">
          <Input placeholder="Enter project name" />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.Item label="Start date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="End date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Project manager">
          <Input placeholder="Enter project manager" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Create</Button>
        </Form.Item>
      </Form>
    </main>
  );
}
