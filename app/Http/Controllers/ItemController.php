<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $items = Item::all();

        return response()->json($items, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param StoreItemRequest $request
     * @return JsonResponse
     */
    public function store(StoreItemRequest $request): JsonResponse
    {
        $item = Item::create($request->validated());

        return response()->json($item, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     * 
     * @param Item $item
     * @return JsonResponse
     */
    public function show(Item $item): JsonResponse
    {
        return response()->json($item, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param UpdateItemRequest $request
     * @param Item $item
     * @return JsonResponse
     */
    public function update(UpdateItemRequest $request, Item $item): JsonResponse
    {
        $item->update($request->validated());

        return response()->json($item, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param Item $item
     * @return Response
     */
    public function destroy(Item $item): Response
    {
        $item->delete();

        return response()->noContent();
    }
}
