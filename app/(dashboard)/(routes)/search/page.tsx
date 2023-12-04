import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/search");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  // On a fresh landing (no category or search applied yet), default the
  // selected category to Computer Science.
  if (!searchParams.categoryId && !searchParams.title) {
    const defaultCategory = categories.find(
      (category) => category.name === "Computer Science"
    );

    if (defaultCategory) {
      return redirect(`/search?categoryId=${defaultCategory.id}`);
    }
  }

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;