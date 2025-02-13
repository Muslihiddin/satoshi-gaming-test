"use client";
import Link from "next/link";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProject, updateProject } from "@/api";

import { Button, Form, FormProps, Input, DatePicker, Spin, App } from "antd";
import dayjs from "dayjs";

import type { UpdateProjectPayload } from "@/types";
import type { Dayjs } from "dayjs";

interface FormValues
  extends Omit<UpdateProjectPayload, "startDate" | "endDate"> {
  startDate: Dayjs;
  endDate: Dayjs;
}

export default function EditProjectPage() {
  const { id } = useParams();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: getProject,
  });

  const [form] = Form.useForm();

  const updatingMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      message.success("Project successfully updated");
      router.push(`/projects/${id}`);
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
    updatingMutation.mutate(formattedVal);
  };

  return (
    <main>
      <header className="flex items-center justify-between mb-10">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl">
          Project edit
        </h1>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Form
          form={form}
          initialValues={{
            projectId: data?.projectId,
            projectName: data?.projectName,
            description: data?.description,
            startDate: dayjs(data?.startDate),
            endDate: dayjs(data?.endDate),
            projectManager: data?.projectManager,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Project ID"
            name="projectId"
            rules={[{ required: true, message: "Project ID is required" }]}
          >
            <Input placeholder="Enter project ID" disabled />
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
            rules={[{ required: true, message: "Description is required" }]}
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
            <div className="flex items-center gap-2">
              <Link href={"/projects"}>
                <Button>Back</Button>
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                loading={updatingMutation.isPending}
              >
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </main>
  );
}
