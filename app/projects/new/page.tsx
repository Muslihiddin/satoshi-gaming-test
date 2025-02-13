"use client";
import React from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createProject } from "@/api";

import { Button, Form, Input, DatePicker, FormProps, App } from "antd";

import type { NewProjectPayload } from "@/types";
import type { Dayjs } from "dayjs";

interface FormValues extends Omit<NewProjectPayload, "startDate" | "endDate"> {
  startDate: Dayjs;
  endDate: Dayjs;
}

export default function NewProjectPage() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { message } = App.useApp();

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      message.success("Project successfully created");
      router.push("/projects");
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const onFinish: FormProps<FormValues>["onFinish"] = (values) => {
    const formattedVal = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };
    mutate(formattedVal);
  };

  return (
    <main>
      <header className="flex items-center justify-between mb-10">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl">
          New project
        </h1>
      </header>

      <Form
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Project ID"
          name="projectId"
          rules={[{ required: true, message: "Project ID is required" }]}
        >
          <Input placeholder="Enter project ID" />
        </Form.Item>
        <Form.Item
          label="Project name"
          name="projectName"
          rules={[{ required: true, message: "Project name is required" }]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Project name is required" }]}
        >
          <Input.TextArea
            placeholder="Enter description"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item
          label="Start date"
          name="startDate"
          rules={[{ required: true, message: "Please provide start date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="End date"
          name="endDate"
          rules={[{ required: true, message: "Please provide end date" }]}
        >
          <DatePicker
            disabledDate={(current) => {
              const startDate = form.getFieldValue("startDate");
              return startDate
                ? current && current < startDate.startOf("day")
                : false;
            }}
          />
        </Form.Item>
        <Form.Item
          label="Project manager"
          name="projectManager"
          rules={[{ required: true, message: "Project manager is required" }]}
        >
          <Input placeholder="Enter project manager" />
        </Form.Item>
        <Form.Item>
          <div className="flex gap-x-2">
            <Link href={"/projects"}>
              <Button>Back</Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>
    </main>
  );
}
