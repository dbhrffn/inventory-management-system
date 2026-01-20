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
     */
    public function store(StoreItemRequest $request): JsonResponse
    {
        $item = Item::create($request->validated());

        return response()->json($item, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json([
                'message' => 'Item not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($item, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, string $id): JsonResponse
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json([
                'message' => 'Item not found'
            ], Response::HTTP_NOT_FOUND);
        }

        $item->update($request->validated());

        return response()->json($item, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): Response|JsonResponse
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json([
                'message' => 'Item not found'
            ], Response::HTTP_NOT_FOUND);
        }

        $item->delete();

        return response()->noContent();
    }
}
