import IconTrash from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/trash.tsx';

export default function FileCard() {
  return (
    <div class='bg-white grid grid-rows-3 rounded-lg h-44'>
      <div
        style={{ borderBottomWidth: '1px' }}
        class='row-span-1 grid grid-cols-8 border-gray-300 text-slate-500 font-semibold'
      >
        <div class='col-span-1  select-none'>Cover</div>
        <div class='col-span-3  select-none'>Title</div>
        <div class='col-span-1  select-none'>Size</div>
        <div class='col-span-2  select-none'>Uploaded</div>
        <div class='col-span-1  select-none'>Action</div>
      </div>
      <div class='row-span-2 grid grid-cols-8 text-black'>
        <div class='col-span-1 justify-center'>
          <div class='w-20 h-20 bg-gray-200 rounded' />
        </div>
        <div class='col-span-3 select-none'>Test</div>
        <div class='col-span-1 select-none'>8 MB</div>
        <div class='col-span-2 select-none'>1 days ago</div>
        <div class='col-span-1'>
          <div style={{ borderWidth: '1px' }} class='w-12 h-12 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-slate-50 active:bg-slate-100'>
            <IconTrash />
          </div>
        </div>
      </div>
    </div>
  );
}
