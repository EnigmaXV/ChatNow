import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import img from "../assets/big-user-pic.png";

const Profile = () => {
  const { user, isLoading, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    profilePicture: user?.user?.profilePicture || "",
  });
  const [errors, setErrors] = useState({});

  const handelFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, profilePicture: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      setErrors({
        submit: error.message || "Failed to update profile. Please try again.",
      });
    }
  };

  console.log(formData);

  const profileImageUrl =
    formData.profilePicture instanceof File
      ? URL.createObjectURL(formData.profilePicture)
      : formData.profilePicture || img;

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/10">
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 cursor-pointer">
                    <Camera size={20} />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      className="hidden"
                      onChange={handelFileChange}
                    />
                  </label>
                )}
              </div>
              <h2 className="text-2xl font-bold mt-4">{formData.name}</h2>
              <p className="text-gray-600">{formData.email}</p>
            </div>

            {errors.submit && (
              <div className="alert alert-error mb-4">
                <span>{errors.submit}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <User size={18} /> Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <Mail size={18} /> Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
