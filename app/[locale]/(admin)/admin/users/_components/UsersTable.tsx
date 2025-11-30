"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserType, UserResponse, PaginatedResponse } from "@/types/user";
import { User, Edit2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UsersTableProps {
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const roleColors: Record<UserType, string> = {
  OWNER: "bg-setup-secondary/20 text-setup-secondary border-setup-secondary/50",
  SUPERADMIN:
    "bg-setup-secondary/20 text-setup-secondary border-setup-secondary/50",
  ADMIN: "bg-setup-secondary/20 text-setup-secondary border-setup-secondary/50",
  GUEST: "bg-setup-primary/50 text-setup-text border-setup-primary",
};

export function UsersTable({ page, limit, onPageChange }: UsersTableProps) {
  const queryClient = useQueryClient();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editImage, setEditImage] = useState("");

  // Fetch users
  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery<PaginatedResponse<UserResponse>>({
    queryKey: ["users", page, limit],
    queryFn: async () => {
      const response = await api.get(`/users/all?page=${page}&limit=${limit}`);
      return response.data;
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({
      userId,
      updates,
    }: {
      userId: string;
      updates: {
        name?: string;
        email?: string;
        role?: UserType;
        image?: string;
      };
    }) => {
      const response = await api.patch(`/users/${userId}/update`, updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
      setEditingUserId(null);
    },
    onError: (error: any) => {
      toast.error("Failed to update user", {
        description: error.response?.data?.message || "An error occurred",
      });
    },
  });

  // Role update mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: UserType;
    }) => {
      const response = await api.patch(`/users/${userId}/update`, { role });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Role updated successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to update role", {
        description: error.response?.data?.message || "An error occurred",
      });
    },
  });

  const handleEdit = (user: UserResponse) => {
    setEditingUserId(user.id);
    setEditName(user.name || "");
    setEditEmail(user.email);
    setEditImage(user.image || "");
  };

  const handleSave = () => {
    if (!editingUserId) return;

    const updates: {
      name?: string;
      email?: string;
      image?: string;
    } = {};

    const currentUser = usersData?.data.find((u) => u.id === editingUserId);
    if (!currentUser) return;

    if (editName !== (currentUser.name || "")) {
      updates.name = editName || undefined;
    }
    if (editEmail !== currentUser.email) {
      updates.email = editEmail;
    }
    if (editImage !== (currentUser.image || "")) {
      updates.image = editImage || undefined;
    }

    if (Object.keys(updates).length === 0) {
      setEditingUserId(null);
      return;
    }

    updateUserMutation.mutate({ userId: editingUserId, updates });
  };

  const handleRoleChange = (userId: string, newRole: UserType) => {
    updateRoleMutation.mutate({ userId, role: newRole });
  };

  if (isLoading) {
    return (
      <Card className="bg-setup-primary border-setup-primary">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-setup-secondary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-setup-primary border-setup-primary">
        <CardContent className="py-12 text-center text-setup-text">
          <p>Failed to load users. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  const users = usersData?.data || [];
  const pagination = usersData?.pagination || {
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
  };

  return (
    <Card className="bg-setup-primary border-setup-primary">
      <CardHeader className="flex flex-col items-start gap-2">
        <CardTitle className="text-setup-text text-lg font-semibold tracking-wide flex items-center gap-2">
          <User className="w-7 h-7 text-setup-secondary" />
          Users
        </CardTitle>
        <span className="text-setup-secondary text-xs font-medium">
          Manage all user accounts here
        </span>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-center py-12 text-setup-text/70">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No users found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-setup-secondary">
                    <th className="text-left p-4 text-sm font-medium text-setup-text">
                      Name
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-setup-text">
                      Email
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-setup-text">
                      Role
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-setup-text">
                      Image
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-setup-text">
                      Created
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-setup-text">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-setup-secondary hover:bg-setup-primary/50 transition-colors"
                    >
                      <td className="p-4">
                        {editingUserId === user.id ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-setup-primary border border-setup-secondary/40 rounded-md px-3 py-2 text-sm text-setup-text focus:outline-none focus:ring-1 focus:ring-setup-secondary"
                            placeholder="Name"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.name || user.email}
                                className="h-8 w-8 rounded-full"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-setup-primary flex items-center justify-center border border-setup-secondary/40">
                                <User className="h-4 w-4 text-setup-text/50" />
                              </div>
                            )}
                            <span className="text-setup-text">
                              {user.name || "No name"}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {editingUserId === user.id ? (
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full bg-setup-primary border border-setup-secondary/40 rounded-md px-3 py-2 text-sm text-setup-text focus:outline-none focus:ring-1 focus:ring-setup-secondary"
                            placeholder="Email"
                          />
                        ) : (
                          <span className="text-setup-text/70 break-all">
                            {user.email}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button>
                              <Badge
                                className={`${roleColors[user.role]} text-xs cursor-pointer`}
                              >
                                {user.role}
                              </Badge>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-setup-primary border-setup-primary">
                            {Object.values(UserType).map((role) => (
                              <DropdownMenuItem
                                key={role}
                                onClick={() => handleRoleChange(user.id, role)}
                                className="text-setup-text hover:bg-setup-secondary/20 cursor-pointer"
                              >
                                {role}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="p-4">
                        {editingUserId === user.id ? (
                          <input
                            type="text"
                            value={editImage}
                            onChange={(e) => setEditImage(e.target.value)}
                            className="w-full bg-setup-primary border border-setup-secondary/40 rounded-md px-3 py-2 text-sm text-setup-text focus:outline-none focus:ring-1 focus:ring-setup-secondary"
                            placeholder="Image URL"
                          />
                        ) : (
                          <span className="text-setup-text/70 text-sm">
                            {user.image ? "Yes" : "No"}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-setup-text/70 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {editingUserId === user.id ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleSave}
                              disabled={updateUserMutation.isPending}
                              className="bg-setup-secondary text-white hover:bg-setup-secondary/90"
                            >
                              {updateUserMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Save"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingUserId(null)}
                              className="border-setup-secondary/40 text-setup-text hover:bg-setup-primary"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(user)}
                            className="text-setup-text hover:bg-setup-secondary/20"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-setup-primary">
                <div className="text-sm text-setup-text/70">
                  Page {pagination.page} of {pagination.totalPages} (
                  {pagination.total} total)
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1 || isLoading}
                    className="border-setup-secondary/40 text-setup-text hover:bg-setup-secondary/20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= pagination.totalPages || isLoading}
                    className="border-setup-secondary/40 text-setup-text hover:bg-setup-secondary/20"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
